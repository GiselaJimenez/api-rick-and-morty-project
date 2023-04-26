import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeslistComponent } from './episodeslist.component';

describe('EpisodeslistComponent', () => {
  let component: EpisodeslistComponent;
  let fixture: ComponentFixture<EpisodeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
