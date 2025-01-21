import { useEffect, useState } from 'react';

interface Option {
  _id: string;
  title: string;
  __v: number;
}

interface MultiSelectDropdownProps {
  formFieldName: string;
  options: Option[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  formFieldName,
  options,
}) => {
  const [newInclude, setNewInclude] = useState('');

  async function addNewIncludes() {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + 'tours/includes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newInclude,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Errore durante la creazione dell'include:", error);
    }
  }

  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />

      <div className="input-style focus:border-b-0">
        <span className="ml-1 text-gray-400">
          Seleziona inclusi o aggiungi nuovo
        </span>
      </div>

      <div className="absolute p-4 bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll rounded-b-xl">
        <input
          name="newIncludes"
          type="text"
          className="block rounded-full mb-4 w-full border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#E29C00] sm:text-sm/6"
          onChange={e => setNewInclude(e.target.value)}
        />
        <button
          className="bg-[#E29C00] py-2 px-6 mb-2 text-white rounded-full font-bold"
          onClick={addNewIncludes}
        >
          Aggiungi Nuovo
        </button>
        <ul className="pt-2 border-t-2 mt-2">
          {options.map(option => {
            return (
              <li key={option['_id']}>
                <label
                  className={`flex whitespace-nowrap cursor-pointer px-2 py-1 rounded-xl transition-colors hover:bg-gray-100 [&:has(input:checked)]:bg-blue-200`}
                >
                  <input
                    type="checkbox"
                    name={formFieldName}
                    value={option.title}
                    className="cursor-pointer"
                  />
                  <span className="ml-1">{option.title}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
};

export default MultiSelectDropdown;
