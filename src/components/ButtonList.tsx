

const names = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit", "Possimus", "reprehenderit", "vel", "doloribus", "et", "veritatis", "odit", "nihil", "distinctio", "amet", "expedita", "Deleniti", "tempore", "ratione", "aliquam", "aliquid", "expedita", "eius", "perferendis", "placeat", , "deserunt", , "non", "nulla", "ab", "unde", "nihil", "suscipit", "doloremque", "earum", "beatae", "mollitia", "dolorem"]

export default function ButtonList() {
  return (
    <div className="overflow-x-auto">
      <ul className="flex" >
        {names.map((name, index) => {
          return <li key={index} className=" text-xs py-2 px-3 m-1 rounded-md bg-neutral-800 hover:bg-neutral-700 transition">
            {name}
          </li>
        })}
      </ul>
    </div>
  )
}
