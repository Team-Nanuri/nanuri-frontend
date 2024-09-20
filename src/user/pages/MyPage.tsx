export default function MyPage() {
  const myItems = [];
  for (let i = 0; i < 50; i++) {
    myItems.push(<MyItem key={i} num={i}/>);
  }
  return (
    <div className="w-full bg-red-300">
      {myItems}
    </div>
  );
}

function MyItem({num}) {
  return (
    <div className="w-full h-[50px] bg-red-300 pb-4">
      MyItem {num}
    </div>
  );
}