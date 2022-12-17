import Hearth from '@material-ui/icons/Favorite';
import React from 'react';

const HealthCheckIcon: React.FC<{ rating: number }> = ({ rating }) => {
  switch(rating) {
    case 0:
      return <Hearth style={{ color: 'green' }}/>;
    case 1:
      return <Hearth style={{ color: 'greenyellow' }}/>;
    case 2:
      return <Hearth style={{ color: 'yellow' }}/>;
    case 3:
      return <Hearth style={{ color: 'black' }}/>;
    default:
      throw Error("Impossible health rating");
  }
};

export default HealthCheckIcon;