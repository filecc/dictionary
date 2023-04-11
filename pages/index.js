import Image from 'next/image'
import Toggle from '@/components/toggle'
import { useState } from 'react'
import Result from '@/components/result';
import { Inter, Lora, Inconsolata } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const lora = Lora({ subsets: ['latin'] })
const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function Home() {
  const [searchWord, setSearchWord] = useState('');
  const [darkMode, setDarkMode] = useState(false);

 
  const [font, setFont] = useState(inter)

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


  const handleSearch = async function (e) {
    if (e.target.value != '') {
      setLoading(true);
      setSearchWord(e.target.value)

      const response = fetch(URL + e.target.value)
        .then((response) => response.json())
        .then((words) => {
          setData(words[0])
          setLoading(false);
        });

      if (!response.ok) {
        setData(false);
      }
    } else {
      setSearchWord('');
      setData(null)
    }
  }
  const handleFont = function (e){
    const value = e.target.selectedOptions[0].value;

    console.log(value)
    switch (value) {
      case 'inter':
        setFont(inter);
        break;
      case 'lora':
        setFont(lora);
        break;
      case 'inconsolata':
        setFont(inconsolata);
        break;
      default:
        setFont(inter)
        break;
    }
  }


  return (
    <div className={darkMode ? `dark bg-[#050505] min-h-screen ${font.className}` : `min-h-screen ${font.className}`}>
      <header className='container mx-auto p-4 lg:max-w-[740px] lg:mx-auto lg:pt-10'>
        <div className='flex justify-between items-center'>
          <div className='relative w-10 h-10'>
            <Image src={'/images/logo.svg'} fill={true} alt='logo' priority />
          </div>
          <div className='flex gap-2 justify-between items-center'>
            <div>
              <select
              onChange={handleFont}
                className="text-gray-900 dark:bg-[#050505] text-sm rounded-lg block  py-2 dark:text-white outline-none me-1">
                <option value="inter" defaultValue={'sans'}>Sans Serif</option>
                <option value="lora">Serif</option>
                <option value="inconsolata">Mono</option>
              </select>
            </div>
            <div className='text-slate-200'>
              |
            </div>
            <Toggle setDarkMode={setDarkMode} darkMode={darkMode} />

          </div>

        </div>
      </header>
      <main className='container mx-auto p-4 lg:max-w-[740px] lg:mx-auto lg:pt-10'>
        <input onInput={handleSearch} className="mt-2 w-full bg-zinc-100 dark:bg-zinc-800 dark:text-white rounded-xl p-2" type="text"
          placeholder="Search for any word..." />

        <div id="mainApp" className="">
          <Result searchWord={searchWord} isLoading={isLoading} data={data} />
        </div>
      </main>
    </div>
  )
}
