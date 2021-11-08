export function showNotification(setter) {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 2000);
  }
  
  export function checkWin(correct, wrong, word) {
    // provjera pobjede
    
    let status = 'win';
    
    word.split('').forEach(letter => {
      if(!correct.includes(letter)){
        status = '';
      }
    });
  
    
    //provjera za gubitak
    if(wrong.length === 6) status = 'lose';
  
    return status;
   }