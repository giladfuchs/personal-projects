import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contacts.service';
import { Photo } from 'src/app/models/models';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Input } from '@angular/core';
import { AbstractModalComponent } from 'src/app/models/modal-class';
import { createFilterPhoto } from 'src/app/shared/util';

@Component({
  selector: 'app-img-contact',
  templateUrl: './imgContact.component.html',
  styleUrls: ['./imgContact.component.css'],
})
export class ImgContactComponent
  extends AbstractModalComponent
  implements OnInit
{
  @Input() photo: Photo | null;
  @Input() userId: number;

  error = '';
  filters: { name: string; apply: boolean }[] = [
    { name: 'blur', apply: false },
    { name: 'grayscale', apply: false },
    { name: 'saturate', apply: false },
  ];

  noImageUrl =
    'data:image/jpeg;base64,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';
  uploadForm = new FormGroup({
    imgSrc: new FormControl(''),
    file: new FormControl(''),
  });

  reader: FileReader;

  constructor(private contactService: ContactService) {
    super();
  }

  ngOnInit(): void {
    if (this.photo) {
      this.filters = [
        { name: 'blur', apply: this.photo.blur },
        { name: 'grayscale', apply: this.photo.gray },
        { name: 'saturate', apply: this.photo.saturation },
      ];
      this.createFilterPhoto();
    }
  }

  onImageChange(e: any) {
    this.error = '';

    const valid = new RegExp(
      '(' + ['.png', '.jpeg'].join('|').replace(/\./g, '\\.') + ')$',
    ).test(this.uploadForm.value.file);
    if (!valid) {
      this.error = "file is not valid only .png', .jpeg";
      this.uploadForm.reset();
      return;
    }
    this.reader = new FileReader();

    if (e.target.files && e.target.files.length && this.reader) {
      const [file] = e.target.files;

      this.reader.readAsDataURL(file);

      this.reader.onload = () => {
        if (file.size > 50000) {
          this.error = 'sorry the file is too big. not over then 50kb please';
          this.uploadForm.reset();
          this.reader = new FileReader();
        }

        this.uploadForm.patchValue({
          imgSrc: this.reader.result,
        });
      };
    }
  }

  onSubmit = async () => {
    const imgUrl = this.uploadForm.value.file
      ? (this.reader.result as string)
      : this.photo
      ? this.photo.imgUrl
      : null;
    if (!imgUrl) {
      this.error = 'there is no photo';
      return;
    }

    const photo = new Photo(
      imgUrl,
      this.filters[0].apply,
      this.filters[1].apply,
      this.filters[2].apply,
      this.photo?.id,
    );
    if (!this.photo) delete photo.id;
    const strQueryType = this.photo ? 'update' : 'create';

    let apiResponse = await this.contactService.addUpdatePhoto(
      photo.id
        ? parseInt(photo.id.toString())
        : parseInt(this.userId.toString()),
      photo,
      strQueryType,
    );
    if (apiResponse) this.cancelEditable();
  };

  onDelete() {
    if (this.photo?.id) this.contactService.deleteItem(this.photo.id, 'Photo');
  }

  cancelEditable() {
    this.reader = new FileReader();
    this.uploadForm.reset();

    this.editMode = false;
  }
  createFilterPhoto(): string {
    return createFilterPhoto(
      this.filters[0].apply,
      this.filters[1].apply,
      this.filters[2].apply,
    );
  }
}
