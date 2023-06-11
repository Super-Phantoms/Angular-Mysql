import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CKEditor4 } from 'src/app/components/ckeditor/ckeditor';

@Component({
  selector: 'app-team-description-editor',
  templateUrl: './team-description-editor.component.html',
  styleUrls: ['./team-description-editor.component.css']
})
export class TeamDescriptionEditorComponent {

  @Input() summary: any;
  @Input() firstName: any;
  @Input() media: any;
  @Input() gallery: any;
  @Input() lastName: any;
  @Input() major: any;

  @Output() updateSummaryEvent = new EventEmitter<string>();
  @Output() updateFirstNameEvent = new EventEmitter<string>();
  @Output() updateMediaEvent = new EventEmitter<string>();
  @Output() updateGalleryEvent = new EventEmitter<string>();
  @Output() updateFileEvent = new EventEmitter<string>();
  @Output() updateLastNameEvent = new EventEmitter<string>();
  @Output() updateMajorEvent = new EventEmitter<string>();

  editorType = CKEditor4.EditorType.CLASSIC;
  editorConfig = {
	  height: '300px'
  }

  front_gallerys: any = [{s:"Common",v:"0"}, {s:"Gallery",v:"1"}, {s:"Group",v:"2"}, {s:"Product",v:"3"}, {s:"Video",v:"4"}]; 

  // public initialOption;
  constructor() {
  }

  ngOnInit() {
	// this.initialOption = this.gallery;
  }
  /**
   * Event handlers of front control
   * @param $event 
   */
  onChangeSummary = ( $event:CKEditor4.EventInfo ) => {
    this.summary = $event.editor.getData();
    this.updateSummaryEvent.emit( this.summary );
  }

  _onChangeFirstName = ( $event ) => {

    this.firstName = $event;
    this.updateFirstNameEvent.emit( $event )
  }

  _onChangeLastName = ( $event ) => {

    this.lastName = $event;
    this.updateLastNameEvent.emit( $event )
  }

  _onChangeMajor = ( $event ) => {

    this.major = $event;
    this.updateMajorEvent.emit( $event )
  }

  _onChangeMedia = ( $event ) => {

  }

  _onChangeGallery = ( $event ) => {
    this.updateGalleryEvent.emit( $event );
  }

  _onChangeMediaSrc = ( $event ) => {
    let el = document.getElementById('media_selector');
    if( el ) {
      el.click();
    }
  }

  onFileSelected(event: any) {
    let selectedFile = event.target.files[0];
    this.media = selectedFile.name;
    this.updateMediaEvent.emit( this.media );
    this.updateFileEvent.emit( selectedFile );
  }

  toggleDisableEditors() {

  }

	onReady( editor: CKEditor4.EventInfo): void {
		console.log( `editor is ready.` );
	}

	onChange( event: CKEditor4.EventInfo ): void {
		console.log( `editor model changed.` );
	}

	onFocus( event: CKEditor4.EventInfo): void {
		console.log( `Focused editing view.` );
	}

	onBlur( event: CKEditor4.EventInfo): void {
		console.log( `Blurred editing view.` );
	}

	onPaste( event: CKEditor4.EventInfo): void {
		console.log( `Pasted into  editing view.` );
	}

	onAfterPaste( event: CKEditor4.EventInfo): void {
		console.log( `After pasted fired in editing view.` );
	}

	onDragStart( event: CKEditor4.EventInfo): void {
		console.log( `Drag started in editing view.` );
	}

	onDragEnd( event: CKEditor4.EventInfo): void {
		console.log( `Drag ended in editing view.` );
	}

	onDrop( event: CKEditor4.EventInfo): void {
		console.log( `Dropped in editing view.` );
	}

	onFileUploadRequest( event: CKEditor4.EventInfo): void {
		console.log( `File upload requested in editor.` );
	}

	onFileUploadResponse( event: CKEditor4.EventInfo): void {
		console.log( `File upload responded in editor.` );
	}

	onNamespaceLoaded( event: CKEditor4.EventInfo): void {
		console.log( `Namespace loaded by editor.` );
	}
}
