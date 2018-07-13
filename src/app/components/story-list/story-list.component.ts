import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Story} from '../../story';
import {CharactersService} from '../../app-services/characters.service';
import {MatDialog} from '@angular/material';
import {CreateCharacterComponent} from '../create-character/create-character.component';
import {CreateStoryComponent} from '../create-story/create-story.component';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  stories$: Observable<Story[]>;

  constructor(
    private characterService: CharactersService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getStories();
  }

  getStories(): void {
    this.stories$ = this.characterService.getStories();
  }

  openCreateMenu(){
    const dialogRef = this.dialog.open(CreateStoryComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
