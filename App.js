import { StatusBar } from 'expo-status-bar';
import React ,{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';
import GoalItem from './component/GoalItem';
import GoalInput from './component/Goalinput';

//flexbox permet de placer les éléments les uns au dessus des autres ou côte à côte
// avec justifyContent on peut contrôler la façon dont les éléments sont distribués le long de leur axe
//avec alignItems on peut contrôler la façon dont les éléments enfants de cette vue sont alignés le long de l'axe tranversal (pour qu'il soit au même niveau par exemple)
//width pour régler la largeur du composant
//onPress pour appeler une fonction lors de l'appui sur un bouton
//
export default function App() {

    // tableau vide
    const [CourseGoals,setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false)


    // fonction qui permet de mettre à jour le tableau
    const addGoalHandler = goalTitle =>{
        //setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoal]);
        // Notre tableau de cours est maintenant un tableau d'objets ou chaque objet a une clé et une valeur associée
        // On peut avoir id comme key en mot clé du tableau
        // ici nous avons qu'un seul élément à retourner donc on peut se passer d'écrire return
        setCourseGoals(currentCourseGoals => [...currentCourseGoals, { id: Math.random().toString(), value : goalTitle}]);
        setIsAddMode(false);
    };

    //fonction pour supprimer un item
    const RemoveGoalHandler = goalId => {
        setCourseGoals(currentGoals => {

            return currentGoals.filter((goal) => goal.id !== goalId);

        });

    }

    const cancelGoalHandler = () => {
        setIsAddMode(false);
    }

    // on mappe tout ce qui est dans le tableau en texte, map fonctionne toujours avec une clé

    /*
    Exemple avec l'utilisation de Map
            </View>
            <ScrollView vertical >
            {CourseGoals.map((goal) =>  <Text style={styles.listitem} key={goal}> {goal}  </Text> )}
            </ScrollView>
</Modal>
            */
  return (
      <View style={styles.firstview}>
          <Button title="Add New Goal" onPress= {() => setIsAddMode(true)}/>

            <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel = {cancelGoalHandler}/>

            <FlatList keyExtractor={(item,index) => item.id} data = {CourseGoals}  renderItem={itemData => <GoalItem  id = {itemData.item.id} onDelete = {RemoveGoalHandler} title={itemData.item.value} />}
            />

    </View>
  );
}

const styles = StyleSheet.create({

    firstview: {
        padding: 50
    }

});
