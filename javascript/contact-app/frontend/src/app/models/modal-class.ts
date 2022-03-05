export abstract class AbstractModalComponent {
  editMode = false;
  setEditable = () => {
    this.editMode = true;
  };

  abstract cancelEditable(): void;
}
