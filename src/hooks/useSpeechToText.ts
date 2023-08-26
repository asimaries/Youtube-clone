import { useEffect, useRef, useState } from "react";

export default function useSpeechToText() {
  const toggleButtonRef = useRef<HTMLButtonElement>(null)
  const [listingStatus, setListingStatus] = useState(false)
  const [isDone, setisDone] = useState(false)
  const [transcribedText, setInTranscribedText] = useState('')
  const recognition = new webkitSpeechRecognition()
  // const transcribedText = useDebounce(intranscribedText);
  recognition.lang = 'en-US'
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event: any) => {
    let interimTranscript = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        setInTranscribedText(transcript);
        recognition.stop()
      }
      else {
        interimTranscript += transcript;
        setInTranscribedText(interimTranscript);
      }
    }
  }
  recognition.onend = function () {
    console.log('end')
    setListingStatus(false)
    setisDone(true)
  }
  useEffect(() => {
    toggleButtonRef.current!.onclick = () => {
      recognition.start();
      setListingStatus(true)
      setisDone(false)
    }
  }, [])
  return { isDone, toggleButtonRef, transcribedText, listingStatus }
}
