import List "mo:base/List";
import Debug "mo:base/Debug";

actor DKeeper {

  //creating a new data type Note
  public type Note = {
    title: Text;
    content: Text;
  };

  //creating a list of notes
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text){
    let newNote: Note = {
      title = titleText;
      content = contentText; 
    };

    notes := List.push(newNote, notes); // newNote is added to the beginning of notes
    Debug.print(debug_show(notes));
  };

  //Why use List in create ? 
  //-> Array is a serialized list, therefore it will not be as efficient to put in on the blockchain 

  public query func readNotes(): async [Note]{
    return List.toArray(notes);
  };

  public func removeNote(id : Nat){
    var front : List.List<Note> = List.take(notes,id);
    var back : List.List<Note> = List.drop(notes,id+1);
    notes := List.append(front,back); 
  }


};