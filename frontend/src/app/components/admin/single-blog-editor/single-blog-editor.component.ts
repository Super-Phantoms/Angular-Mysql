import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CKEditor4 } from 'src/app/components/ckeditor/ckeditor';

interface CatsRelPost {
  id: 0,
  title: string;
  summary: '',
  images: [title:'',img:''],
  url: '',
  site_title: '',
  type: 34,
  sort: 0
}

@Component({
  selector: 'app-single-blog-editor',
  templateUrl: './single-blog-editor.component.html',
  styleUrls: ['./single-blog-editor.component.css']
})
export class SingleBlogEditorComponent {

  @Input() id: any = 0;
  @Input() title: any;
  @Input() subject: any;
  @Input() mobile_subject: any;
  @Input() summary: any;
  @Input() media: any;
  @Input() gallery: any;
  @Input() url: any = '';
  @Input() site_title = '';
  @Input() type = 0;
  @Input() postdt = '';
  @Input() author = '';
  @Input() relpost = '';
  @Input() cats_relposts: CatsRelPost[] = [];

  @Input() s_no: any;
  @Input() has_gallery: any = true;
  @Input() has_media: any = true;
  @Input() has_title: any = true;
  @Input() show_subject: any = false;
  @Input() show_mobile_subject: any = false;

  @Output() updateSubjectEvent = new EventEmitter<string>();
  @Output() updateMobileSubjectEvent = new EventEmitter<string>();

  @Output() updateSummaryEvent = new EventEmitter<string>();
  @Output() updateTitleEvent = new EventEmitter<string>();
  @Output() updateMediaEvent = new EventEmitter<string>();
  @Output() updateGalleryEvent = new EventEmitter<string>();
  @Output() updateFileEvent = new EventEmitter<string>();
  @Output() updatePostDateEvent = new EventEmitter<string>();
  @Output() updateAuthorEvent = new EventEmitter<string>();
  @Output() updateRelPostEvent = new EventEmitter<string>();

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
  onChangeSubject = ( $event:CKEditor4.EventInfo ) => {
    this.subject = $event.editor.getData();
    this.updateSubjectEvent.emit( this.subject );
  }

  onChangeMobileSubject = ( $event:CKEditor4.EventInfo ) => {
    this.mobile_subject = $event.editor.getData();
    this.updateMobileSubjectEvent.emit( this.mobile_subject );
  }

  onChangeSummary = ( $event:CKEditor4.EventInfo ) => {
    this.summary = $event.editor.getData();
    this.updateSummaryEvent.emit( this.summary );
  }

  _onChangeTitle = ( $event ) => {

    this.title = $event;
    this.updateTitleEvent.emit( $event )
  }

  _onChangeMedia = ( $event ) => {

  }

  _onChangeGallery = ( $event ) => {
    this.updateGalleryEvent.emit( $event );
  }

  _onChangeMediaSrc = ( $event ) => {
    let fileInput = $($event.target).parents('form').find("input[type='file']");
    fileInput.trigger('click');
  }
  _onChangePostDate = ( $event ) => {

    this.updatePostDateEvent.emit( $event )
  }

  _onChangeAuthor = ( $event ) => {

    this.updateAuthorEvent.emit( $event );
  }

  _onClearAuthor = ( $event ) => {
    this.author='';
    this.updateAuthorEvent.emit( "" );
  }

  _onChangeRelPost = ( $event ) => {

    this.updateRelPostEvent.emit($event.value);
  }

  _onDeleteMediaSrc = ( $event ) => {
    this.media = "Deleted";
    this.updateMediaEvent.emit( this.media );
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
