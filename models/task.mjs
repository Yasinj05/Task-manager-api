import mongoose from "mongoose";
import Joi from "joi";

// Define the schema for the Task model
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  category: {
    type: String,
    required: true,
    enum: ["Personal", "Work", "Study", "Others"],
  },
});

// Create the Task model from the schema
const Task = mongoose.model("Task", taskSchema);

// Validation function for validating task objects
function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().min(2).max(20).required(),
    task: Joi.string().required(),
    date: Joi.date().required(),
    category: Joi.string()
      .valid("Personal", "Work", "Study", "Others")
      .required(),
  });

  return schema.validate(task);
}

export { Task, validateTask as validate, taskSchema };
