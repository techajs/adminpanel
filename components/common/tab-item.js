const TabLayout = ({tabs,selectedTab,setSelected}) =>{

    const selectHandler = (tabValue)=>{
        setSelected(tabValue)
    }

    return (
        <div className="flex bg-boxdark dark:border-strokedark dark:bg-boxdark border-b rounded-md p-2 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => selectHandler(tab.id)}
            className={`px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedTab === tab.id
                ? "bg-white text-black" // Active tab styling
                : "bg-transparent text-white hover:bg-gray-800" // Inactive tab styling
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )
}

export default TabLayout