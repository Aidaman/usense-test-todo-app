import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTodoDialog } from './delete-todo-dialog';

describe('DeleteTodoDialog', () => {
  let component: DeleteTodoDialog;
  let fixture: ComponentFixture<DeleteTodoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTodoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTodoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
