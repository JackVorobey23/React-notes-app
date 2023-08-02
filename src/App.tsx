import React from 'react';
import './App.css';
import TableComponent from './components/Table';
import TableInfo from './interfaces/TableInfo';
import TableButton from './interfaces/TableButton';
import { ButtonAction } from './enums/ButtonAction';
function App() {

  const tableInfo: TableInfo = {
    tHeads: ['head1', 'head2', 'head3'],
    tRows: [
      ['1', 'veryveryveryveryveryveryveryveryveryveryveryvery long text', 'img', [{
        action: ButtonAction.EditNote,
        attachedNoteId: "1111"
      }],
      [{
        action: ButtonAction.ArchiveNote,
        attachedNoteId: "1111"
      }]],
      ['2', 'veryveryveryveryveryveryveryveryveryveryveryvery long text', 'img', [{
        action: ButtonAction.EditNote,
        attachedNoteId: "1111"
      }]],
      ['3', 'veryveryveryveryveryveryveryveryveryveryveryvery long text', 'img', [{
        action: ButtonAction.EditNote,
        attachedNoteId: "1111"
      }]],
      ['41', 'veryveryveryveryveryveryveryveryveryveryveryvery long text', 'img', [{
        action: ButtonAction.EditNote,
        attachedNoteId: "1111"
      }]],
      ['5', 'veryveryveryveryveryveryveryveryveryveryveryvery long text', 'img', [{
        action: ButtonAction.EditNote,
        attachedNoteId: "1111"
      }]],
      ['6', 'veryveryveryveryveryveryveryveryveryveryveryvery long text', 'img', [{
        action: ButtonAction.EditNote,
        attachedNoteId: "1111"
      }]]
    ]
  }
  return (
    <div className="App">
      <main>
        <TableComponent tHeads={tableInfo.tHeads} tRows={tableInfo.tRows} />
      </main>
    </div>
  );
}

export default App;
