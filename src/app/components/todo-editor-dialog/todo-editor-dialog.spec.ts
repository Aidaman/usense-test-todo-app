import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoEditorDialog } from './todo-editor-dialog';

describe('TodoEditorDialog', () => {
  let component: TodoEditorDialog;
  let fixture: ComponentFixture<TodoEditorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoEditorDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoEditorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
