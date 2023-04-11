import Image from "next/image";
import { useState, useEffect } from "react";

export default function Result(props) {

  if (props.isLoading) return <div className="flex justify-center items-center gap-1 p-2"> <Image width={15} height={15} className="animate-spin" src="/images/icon-spinner.svg" alt="spinner" /><span> Loading...</span></div>;
  if (!props.data && props.searchWord.length < 1) return <div></div>
  if (!props.data) return <p className={"p-2 text-center"}>No result</p>;

  const { word, meanings, phonetic, sourceUrls, ...data } = props.data;

  // function to get a random number, extreme included
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  const sourceAudio = data.phonetics[0]?.audio || data.phonetics[1]?.audio || data.phonetics[2]?.audio || false;

  const handlePlay = function () {
    if (sourceAudio) {
      const audio = new Audio(sourceAudio);
      audio.play();
    }
  }


  return (

    <>

      <div className="mt-4 flex justify-between items-center mb-8">
        <div className="grow">
          <h2
            id="title"
            className="text-[32px] md:text-[64px] font-bold dark:text-white"
          >
            {word}
          </h2>
          <p id="phonetics" className={"text-fg-pink text-[18px] md:text-[24px]"}>
            {data.phonetic || data.phonetics[0]?.text || data.phonetics[1]?.text}
          </p>
        </div>
        <div className={"w-2/12 max-w-[80px] min-w-[50px] max-h-[80px] min-h-[50px] relative cursor-pointer" + ' ' + (!sourceAudio && 'saturate-0 cursor-default')}>
          <Image
            src="/images/icon-play.svg"
            alt="play audio"
            fill={true}
            onClick={handlePlay}
          />
        </div>
      </div>
      {meanings.map(el =>
        <div key={getRandomInt(0, 1000)}>
          <div className="flex justify-between items-center">
            <p className="font-bold italic dark:text-white md:text-[24px]">{el.partOfSpeech}</p>
            <div className="separator bg-zinc-200 ms-4 w-full h-[1px]"></div>
          </div>
          <div className="p-4">
            <ul className="list-disc">
              {el.definitions.map(item => <li className="text-[#2D2D2D] dark:text-white md:text-[18px] md:leading-[24px] mb-3" key={item.definition}>
              <p>{item.definition}</p>
              {item.example ? <p className="text-[#757575] mt-2 italic">&quot;{item.example}&quot;</p> : ''}
              </li>)}
            </ul>
            
            {el.synonyms?.length > 0 
            && <div className="p-2">
              <h3 className="my-4 text-[#757575] md:text-[20px]">Synonyms</h3>
            <p className="text-fg-pink font-bold mb-2 md:text-[20px]">{el.synonyms.join(', ')}</p>
            </div> 
            }
          </div>
        </div>
        
      )}
      <div className="separator bg-zinc-200 w-full h-[1px]"></div>
      <div className="mt-4">
        <p className="'text-[#757575] underline dark:text-white pb-2">Source</p>
        <a className="dark:text-white underline" target="_blank" href={sourceUrls && sourceUrls[0]}>{sourceUrls[0]} <Image className="ms-2 inline" src={'/images/icon-targetblank.svg'} width={14} height={14} alt="icon new page" /></a>
        
      </div>
    </>
  );
}
