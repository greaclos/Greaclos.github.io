const game_database = {};

(function () {
  let game_id = false;

  function new_game(player1, board) {
    const game_data = {
      player1: player1,
      board: board,
      gameover: false,
      createdat: firebase.database.ServerValue.TIMESTAMP,
    };

    if (!game_id) {
      game_id = firebase.database().ref().child("games").push().key;
    }

    let updates = {};
    updates["/games/" + game_id] = game_data;

    let game_ref = firebase.database().ref();

    game_ref
      .update(updates)
      .then(function () {
        return { success: true, message: "Game created" };
      })
      .catch(function (error) {
        return { success: false, message: "Creation failed: ", error };
      });
  }

  function remove_game() {
    if (!game_id) return { success: false, message: "Invalid Game " };

    let game_ref = firebase.database().ref("/games/" + game_id);

    game_ref
      .remove()
      .then(function () {
        return { success: true, message: "Game removed" };
      })
      .catch(function (error) {
        return { success: false, message: "Remove failed: ", error };
      });
  }

  function update_game(board) {
    if (!game_id) return { success: false, message: "Invalid Game " };

    let game_ref = firebase.database().ref("/games/" + game_id);

    let updates = {};
    updates["/board"] = board;
    updates["/lastupdate"] = firebase.database.ServerValue.TIMESTAMP;

    game_ref
      .update(updates)
      .then(function () {
        return { success: true, message: "Game updated" };
      })
      .catch(function (error) {
        return { success: false, message: "Update failed: ", error };
      });
  }

  function reset_game() {
    if (!game_id) return { success: false, message: "Invalid Game " };

    game_id = false;
    return { success: true, message: "Game reset" };
  }

  async function listen_game() {
    if (!game_id) return { success: false, message: "Invalid Game " };

    let game_ref = firebase.database().ref("/games/" + game_id);

    game_ref
      .once("child_changed")
      .then(function (snapshot) {
        //Board
        if (snapshot.key == "board") {
          console.log("Board Changed", snapshot.val());
          return {
            success: true,
            message: "Board updated",
            data: snapshot.val(),
          };
          //gameOver
        } else if (snapshot.key == "gameover") {
          console.log("Game Over", snapshot.val());
          return {
            success: true,
            message: "Game Over",
            data: snapshot.val(),
          };
        }
      })
      .catch(function (error) {
        return { success: false, message: "Invalid data: ", error };
      });
  }

  game_database.new = new_game;
  game_database.remove = remove_game;
  game_database.update = update_game;
  game_database.reset = reset_game;
  game_database.listen = listen_game;

})();
