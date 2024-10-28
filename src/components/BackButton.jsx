//Tools
import { useNavigate } from 'react-router-dom';

//Components
import Button from './Button';

function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type='back'
      onClick={(e) => {
        e.preventDefault();
        //We can use -1 to set the browser on a previous page meaning the steps to go back
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
