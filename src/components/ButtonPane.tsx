import React from 'react';

interface ButtonPaneProps {
    onClickSave: () => void;
    onClickInput: () => void;
    onClickDelete: () => void;
}

const ButtonPane: React.FC<ButtonPaneProps> = ({ onClickSave, onClickInput, onClickDelete }) => {
    return (

        <div className='flex gap-10 justify-evenly '>

            <button onClick={onClickSave} className="hover:bg-sky-400  font-serif  text-sm btn btn-primary border-2 border-black p-2 bg-gray-200">
                Save Current Tab
            </button>

            <button onClick={onClickInput} className="hover:bg-sky-400 font-serif text-sm btn btn-primary border-2 border-black p-2 bg-gray-200">
                Save Input
            </button>

            <button onClick={onClickDelete} className="hover:bg-sky-400 font-serif  text-sm btn btn-primary border-2 border-black p-2 bg-gray-200">
                Delete All
            </button>

        </div>
    );
};

export default ButtonPane;
