import * as fontAwesomeIcons from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ButtonAction } from "../enums/ButtonAction";
import Note from "../interfaces/Note";

const icons = new Map<ButtonAction, IconProp>();
icons.set(ButtonAction.ArchiveNote, fontAwesomeIcons.faBoxArchive);
icons.set(ButtonAction.ArchiveAllNotes, fontAwesomeIcons.faBoxArchive);
icons.set(ButtonAction.EditNote, fontAwesomeIcons.faPenToSquare);
icons.set(ButtonAction.RemoveAllNotes, fontAwesomeIcons.faTrash);
icons.set(ButtonAction.RemoveNote, fontAwesomeIcons.faTrash);
icons.set(ButtonAction.UnarchiveAllNotes, fontAwesomeIcons.faArrowUpFromBracket);
icons.set(ButtonAction.UnarchiveNote, fontAwesomeIcons.faArrowUpFromBracket);

const noteInitialState = [{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Task',
  content: "Eggs, Milk 15/8/2023 21/8/2023",
  dates: ["15/8/2023", "21/8/2023"],
  id: "0000",
  isArchived: false
},
{
  name: "Personal Notes",
  created: "August 2, 2023",
  category: 'Random Thought',
  content: "Meeting at 3 PM 22/8/2023",
  dates: ["22/8/2023"],
  id: "1111",
  isArchived: false
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Random Thought',
  content: "Submit report, Prepare presentation for 28/8/2023",
  dates: ["28/8/2023"],
  id: "2222",
  isArchived: false
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Task',
  content: "Bananas, Apples 3/9/2023 5/9/2023",
  dates: ["3/9/2023", "5/9/2023"],
  id: "3333",
  isArchived: false
},
{
  name: "Personal Notes",
  created: "August 2, 2023",
  category: 'Idea',
  content: "Meeting at 3 PM 10/9/2023",
  dates: ["10/9/2023"],
  id: "4444",
  isArchived: false
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Idea',
  content: "Submit report, Prepare presentation for 15/9/2023",
  dates: ["15/9/2023"],
  id: "5555",
  isArchived: true
},
{
  name: "Personal Notes",
  created: "August 2, 2023",
  category: 'Random Thought',
  content: "Meeting at 3 PM 18/9/2023",
  dates: ["18/9/2023"],
  id: "6666",
  isArchived: true
},
{
  name: "Shopping List",
  created: "August 2, 2023",
  category: 'Idea',
  content: "Submit report, Prepare presentation for 22/9/2023",
  dates: ["22/9/2023"],
  id: "7777",
  isArchived: true
}] as Note[];

class DateHelper {
  static formatCreatedDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    return new Date(dateString).toLocaleString('en-US', options);
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  static getDatesFromContent(content: string): string[] {
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;

    const matchedDates = content.match(dateRegex);

    if (matchedDates) {
      return (matchedDates as string[])?.map(date => {
        try {
          
          return this.formatDate(date);
        }
        catch(a) {
          console.log(`${date} is invalid date.`);
          
          return '';
        }
      }).filter(date => date !== '');
    }
    return [];
  }
}

export { icons, noteInitialState, DateHelper };