import { AngularEditorConfig } from "@kolkov/angular-editor";

export const HtmlEditorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'calc(80vh - 380px)',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: 'Roboto',
  defaultFontSize: '2',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: false,
  toolbarPosition: 'top',
};