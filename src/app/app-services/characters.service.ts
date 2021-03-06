import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import 'core-js/es7/reflect';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Character } from '../character';
import { Story } from '../story';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private characters: AngularFirestoreCollection<Character>;
  private stories: AngularFirestoreCollection<Story>;
  activeStory = new BehaviorSubject<Story>(null);

  //activeCharacter = new BehaviorSubject<Character>(null);

  constructor(db: AngularFirestore) {
    this.characters = db.collection<Character>('/characters');
    this.stories = db.collection<Story>('/stories');
  }

  getCharactersFB(): Observable<Character[]> {
    return this.characters.valueChanges();
  }

  getStories(): Observable<Story[]> {
    return this.stories.valueChanges();
  }

  addStory(title, prompt) {
    const story = {
      id: this.makeId(),
      title: title,
      // character: Character,
      plot: [prompt]
    };
    this.stories.doc(story.id).set(story).then(function () {
      console.log('Story created!');
    });
  }

  addCharacter(name, gender, appearance, bio, item) {
    let character;
    if(item === '') {
      character = {
        id: this.makeId(),
        name: name,
        gold: 0,
        gender: gender,
        appearance: appearance,
        bio: bio,
        inventory: []
      };
    } else {
      character = {
        id: this.makeId(),
        name: name,
        gold: 0,
        gender: gender,
        appearance: appearance,
        bio: bio,
        inventory: [item]
      };
    }
    this.characters.doc(character.id).set(character).then(function () {
      console.log('character created!');
    });
  }

  deleteCharacter(character) {
    this.characters.doc(character).delete();
    console.log('Character killed.');
  }

  getDetails(id: string): Observable<Character> {
    return this.getCharactersFB().pipe(map((characters: Character[]) => {
      return characters.find((character: Character) => character.id == id);
    }));
  }
  getStoryDetails(id: string): Observable<Story> {
    return this.getStories().pipe(map((stories: Story[]) => {
      return stories.find((story: Story) => story.id == id);
    }));
  }

  makeId() {
    let text = '';
    let possibleLetter = 'abcdefghijklmnopqrstuvwxyz';
    let possibleNumber = '0123456789';

    for (let i = 0; i < 3; i++)
      text += possibleLetter.charAt(Math.floor(Math.random() * possibleLetter.length));
    for (let i = 0; i < 4; i++)
      text += possibleNumber.charAt(Math.floor(Math.random() * possibleNumber.length));
    console.log(text);
    return text;
  }
}
