import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group';
import { GroupService } from '../services/group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  paramSubscription: any;
  groupSubscription: any;
  group: Group;
  id: number;
  constructor(
    private gs: GroupService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {

    this.paramSubscription = this.ar.params.subscribe(params => {
      this.id = params['_id'],
      function(err){ console.log('unable to get id');}
    })

    this.groupSubscription = this.gs.getGroup(this.id)
    .subscribe(
      group => this.group = group[0],
      function(err) {
        console.log('unable to get group');
      }
    );
  }

  ngOnDestroy(){
    if (this.paramSubscription)
      this.paramSubscription.unsubscribe();
    if (this.groupSubscription)
      this.groupSubscription.unsubscribe();
  }



}