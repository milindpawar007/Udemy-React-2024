import { useEffect } from "react";
export default function useKEY(key ,action){
      useEffect(() => {
        function handleKeyDown(e) {
          if (e.key.toLowerCase() === key.toLowerCase()) {
            if (action) action();
            
          }
        }
        document.addEventListener("keydown", handleKeyDown);
        return function cleanup() {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [action ,key]);
}