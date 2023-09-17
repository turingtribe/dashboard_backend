const { MsatSubSection } = require("../models/msat_Subsection");
const { Question } = require("../models/question");
const { Options } = require("../models/options");
const { Msat } = require("../models/msatModel");

class MsatController {
  constructor() {}

  async createModels(req, res) {
    try {
      const models = req.body;

      // Iterate over the array of objects and create a new instance of each model for each object.
      for (const model of models) {
        const newMsat = await Msat.create(model);
        // If the model has a sub-section, create a new instance of the sub-section model.
        let msatId = newMsat.msatId;
        if (model.sub_section) {
          const newMsatSubSection = await MsatSubSection.create({
            msat_Id: msatId,
            sub_section_name: model.sub_section.sub_section_name,
          });
          let sectionId = newMsatSubSection.sub_sectionId;

          // Associate the sub-section with the model.
          newMsat.sub_section = newMsatSubSection;

          // If the model has questions, create a new instance of each question model.
          if (model.sub_section.questions) {
            for (const question of model.sub_section.questions) {
              question.subsection_id = sectionId;
              const newQuestion = await Question.create(question);
              // Associate the question with the model.
              // newMsat.sub_section.questions.push(newQuestion);
              let questionId = newQuestion.questionId;
              console.log(question);
              // If the model has options, create a new instance of each option model.
              console.log(model.sub_section.questions);
              if (question.options) {
                for (const option of question.options) {
                  option.question_id = questionId;
                  const newOption = await Options.create(option);
                  // Associate the option with the model.
                  // newMsat.sub_section.question.options.push(newOption);
                }
              }
            }
          }
        }

        // Save the model to the database.
        await newMsat.save();
      }
      // Return a success response.
      res.status(200).json({ message: "Models successfully uploaded." });
    } catch (error) {
      // Return an error response.
      res.status(500).json({ error: error.message });
    }
  }

  //getAllMsat
  async getAllMsat(req, res) {
    try {
      const msats = await Msat.findAll();
      const result = [];
      for (let msat of msats) {
        const msatId = msat.dataValues.msatId;
        msat.dataValues["sub_section"] = [];
        const sub_sections = await MsatSubSection.findAll({
          where: {
            msat_Id: msatId,
          },
        });
        for (let sub_section of sub_sections) {
          // console.log(sub_section)
          msat.dataValues["sub_section"].push(sub_section.dataValues);
          const sub_sectionId = sub_section.dataValues.sub_sectionId;
          sub_section.dataValues["questions"] = [];
          const questions = await Question.findAll({
            where: {
              subsection_id: sub_sectionId,
            },
          });
          for (let question of questions) {
            sub_section.dataValues["questions"].push(question.dataValues);
            const questionId = question.dataValues.questionId;
            const options = await Options.findAll({
              where: {
                question_Id: questionId,
              },
            });
            console.log(question);
            question.dataValues["options"] = options;
          }
        }
        result.push(msat);
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(501).send(error);
    }
  }
}

module.exports = { MsatController };
