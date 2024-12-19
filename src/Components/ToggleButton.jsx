import { Button } from './ui/button';

export default function ToggleButton({ wraperRefs, cb, children }) {
  const toggleSelectedElement = (selectedElement) => {
    for (const ref of wraperRefs) {
      if (ref?.current) {
        const toggles = ref.current.querySelectorAll('[data-state="on"]');
        for (const toggle of toggles) {
          toggle.removeAttribute('data-state', 'on');
        }
      }
    }
    selectedElement.setAttribute('data-state', 'on');
    cb();
  };

  return (
    <Button
      variant='outline'
      onClick={(e) => toggleSelectedElement(e.currentTarget)}
      size='sm'
      className='
        text-sm
        h-8
        px-4
        font-medium
        cursor-pointer
        text-center
        border
        border-gray-200
        bg-white
        hover:bg-gray-50
        rounded-full
        shadow-sm
        transition-all
        duration-200
        data-[state=on]:bg-gradient-to-r
        data-[state=on]:from-blue-500
        data-[state=on]:to-indigo-600
        data-[state=on]:text-white
        data-[state=on]:border-transparent
        data-[state=on]:shadow-md
        data-[state=on]:hover:from-blue-600
        data-[state=on]:hover:to-indigo-700
        data-[state=on]:scale-105
      '
    >
      {children}
    </Button>
  );
}
