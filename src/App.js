import './App.css';
import Driverprad from './Components/DriverManagement/Driverprad';
import Newdriver from './Components/DriverManagement/Newdriver';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Driverslist from './Components/DriverManagement/Driverslist';
import Payments from './Components/Payment/Payments';
import ExcelUploader from './Components/Employee/Employeedata';
import Invoice from './Components/DriverManagement/Invoice';
import PaymentPage from './Components/DriverManagement/Paythrough';
import UploadExcel from './Components/Employee/Employeedata';
import Upload from './Components/Employee/Vennela';
import VehicleForm from './Components/Employee/Vennela';
function App() {
  return (
    
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/driverform' element={<Newdriver/>}/>
      <Route path='/driverprofile' element={<Driverprad/>}/>
      <Route path='/viewdrivers' element={<Driverslist />}/>
      <Route path='/viewPayments' element={<Payments />}/>
      <Route path='/employeedata' element={<ExcelUploader />} />
      <Route path="/viewemployee" element={<UploadExcel />}/>
      <Route path='/viewinvoice' element={<Invoice />} />
      <Route path='/paythroughh' element={<PaymentPage />} />
      <Route path='/vennela' element={<VehicleForm />}/>
    </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
