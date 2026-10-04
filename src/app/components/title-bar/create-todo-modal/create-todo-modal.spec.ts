import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTodoModal } from './create-todo-modal';

describe('CreateTodoModal', () => {
  let component: CreateTodoModal;
  let fixture: ComponentFixture<CreateTodoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTodoModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTodoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
