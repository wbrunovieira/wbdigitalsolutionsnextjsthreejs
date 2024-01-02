//use client
import LanguageRouter from '../utils/LanguageRouter';
import Home from '../components/Home'; 

function Index() {
  return (
    <div>
      <LanguageRouter /> 
      <Home /> 
    </div>
  );
}

export default Index;
