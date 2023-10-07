import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { JsonRoutes } from 'meteor/simple:json-routes';

const insertTask = taskText => TasksCollection.insert({ text: taskText });

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});



JsonRoutes.add('get', '/api/u', (req, res) => {
  try {
    // Validez les données de la requête et assurez-vous de l'authentification.
    // Effectuez la mise à jour dans la base de données MongoDB.
    // const dataToUpdate = req.body; // Supposons que les données sont transmises en tant que JSON dans le corps de la requête.
    // Faites la mise à jour dans la base de données.

    // Envoyez une réponse de succès.
    JsonRoutes.sendResult(res, {
      code: 200,
      data: { message: 'Mise à jour réussie' },
    });
  } catch (error) {
    // Gérez les erreurs et envoyez une réponse d'erreur en cas de problème.
    JsonRoutes.sendResult(res, {
      code: 500,
      data: { error: 'Erreur lors de la mise à jour des données' },
    });
  }
});
