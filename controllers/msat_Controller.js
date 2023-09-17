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
        let id = newMsat.msatId;
        if (model.sub_section) {
          const newMsatSubSection = await MsatSubSection.create({
            msat_Id: id,
            sub_section_name: model.sub_section.sub_section_name,
          });
          id = newMsatSubSection.sub_sectionId;

          // Associate the sub-section with the model.
          newMsat.sub_section = newMsatSubSection;

          // If the model has questions, create a new instance of each question model.
          if (model.sub_section.questions) {
            for (const question of model.sub_section.questions) {
              question.subsection_id = id;
              const newQuestion = await Question.create(question);
              // Associate the question with the model.
              newMsat.sub_section.questions.push(newQuestion);
              id = newQuestion.question_id;

              // If the model has options, create a new instance of each option model.
              if (model.sub_section.questions.options) {
                console.log(option);
                for (const option of model.sub_section.question.options) {
                  option.question_id = id;
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
}

module.exports = { MsatController };
