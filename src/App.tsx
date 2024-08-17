import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import ButtonPane from './components/ButtonPane';
import Footer from './components/Footer';

declare const chrome: any;

function App() {

  // Define the Bookmark type
  type Bookmark = {
    url: string;
  };

  // State to hold bookmarks
  let [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  // State to hold input text
  let [inputText, setInputText] = useState("");

  // Function to store input text from the input field
  function storeInput(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }




  useEffect(() => {
    // Load bookmarks from localStorage when the app loads
    const savedBookmarks = localStorage.getItem('bookmarks');
    console.log(savedBookmarks);
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Function to save the current tab URL
  function saveTab(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
      const activeTab = tabs[0];
      if (activeTab && activeTab.url) {
        //Make newBookmark array and update state and local storage
        const newBookmarks = [...bookmarks, { url: activeTab.url }];
        setBookmarks(newBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      }
    });
  }

  // Function to save the input text as a bookmark
  function saveInput(): void {
    if (inputText.length > 0) {
      //Make newBookmark array and update state and local storage
      const newBookmarks = [...bookmarks, { url: inputText }];
      setBookmarks(newBookmarks);
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    }
    // Clear the input field after saving
    setInputText("");
  }

  // Function to delete all bookmarks
  function deleteAll(): void {
    setBookmarks([]);
    localStorage.clear();
  }



  return (
    <div className="container bg-gradient-to-r from-indigo-400 to-cyan-400">
      <h1 className="font-mono text-2xl font-bold p-5 mt-4">You Bookmarked These...</h1>

      <input
        value={inputText}
        id="input"
        placeholder="Input Link or Save Current Tab"
        type='text'
        className='w-full m-5 h-10 p-2 mb-5 '
        onChange={storeInput}
      />

      {/* All Our Buttons */}
      <ButtonPane onClickSave={saveTab} onClickInput={saveInput} onClickDelete={deleteAll} />


      <div className="list w-full h-full pb-10 overflow-y-scroll mt-5 border-4 border-blue-300">
        <h2 className='mt-2 font-bold font-mono'>Saved Items...</h2>
        <ul id="bookList" className='list-disc mt-2 '>
          {






            bookmarks.map((b, index) => (
              <li key={index}>
                <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={b.url} target='_blank' rel="noopener noreferrer">{b.url}</a>
              </li>
            ))


          }
        </ul>
      </div>


      <Footer />
    </div>
  );
}

export default App;
