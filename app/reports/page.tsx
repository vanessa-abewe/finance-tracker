// "use client"
// import { Button } from "@nextui-org/react";
//   import { useState } from "react";
  
// import ReportRequestModal from '../components/generatereports';

// export default function GenerateReport() {
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const showModal = () => setIsModalVisible(true);
//     const hideModal = () => setIsModalVisible(false);

//     return (
//         <div className="w-64 h-screen bg-purple-200 p-4 fixed left-0 top-0">
//             {/* ... existing code ... */}
//             <Button
//                 color="primary"
//                 className="text-purple-900 mt-20"
//                 onPress={showModal}
//             >
//                 Generate Report
//             </Button>
//             <ReportRequestModal visible={isModalVisible} onClose={hideModal} />
//             {/* ... rest of the code ... */}

//             {/* Add more sidebar items here */}
//         </div>
//     )
//         }
  