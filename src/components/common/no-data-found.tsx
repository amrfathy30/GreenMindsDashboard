import React, { CSSProperties } from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onAction?: () => void;
  actionText?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title , 
  description , 
  onAction, 
  actionText 
}) => {
  return (
    <div style={styles.container}>
        <img 
          src='/images/no_data_found.png' 
          alt="Empty state illustration" 
          style={styles.image} 
        />
      <h2 style={styles.title} className='text-black dark:text-white'>{title}</h2>
      <p style={styles.description} className='text-gray dark:text-gray-300'>{description}</p>

    </div>
  );
};


const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: 'transparent',
    margin: 'auto',
  
  },
  image: {
    width: '300px',
    height: 'auto',
    marginBottom: '20px',
  },
  title: {
    fontSize: '1.5rem',
    margin: '0 0 10px 0',
  },
  description: {
    fontSize: '1rem',
    margin: '0 0 20px 0',
    lineHeight: '1.5',
  },

};

export default EmptyState;