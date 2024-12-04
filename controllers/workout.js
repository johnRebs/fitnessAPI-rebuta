const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {
  const newWorkout = new Workout({ ...req.body, userId: req.user.id });

  newWorkout.save()
    .then(workout => res.status(201).send(workout))
    .catch(err => res.status(500).send({ error: "Error adding workout", details: err }));
};

module.exports.getMyWorkouts = (req, res) => {
  Workout.find({ userId: req.user.id })
    .then(workouts => res.status(200).send(workouts))
    .catch(err => res.status(500).send({ error: "Error fetching workouts", details: err }));
};

module.exports.updateWorkout = (req, res) => {
  Workout.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true })
    .then(workout => res.status(200).send(workout))
    .catch(err => res.status(500).send({ error: "Error updating workout", details: err }));
};

module.exports.deleteWorkout = (req, res) => {
  Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    .then(() => res.status(200).send({ message: "Workout deleted successfully" }))
    .catch(err => res.status(500).send({ error: "Error deleting workout", details: err }));
};

module.exports.completeWorkoutStatus = (req, res) => {
  Workout.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { status: "completed" }, { new: true })
    .then(workout => res.status(200).send(workout))
    .catch(err => res.status(500).send({ error: "Error marking workout as complete", details: err }));
};
