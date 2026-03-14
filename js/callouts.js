// Handle collapsible Obsidian callouts
document.addEventListener('DOMContentLoaded', function() {
  const collapsibleCallouts = document.querySelectorAll('.callout-collapsible');
  
  collapsibleCallouts.forEach(function(callout) {
    const title = callout.querySelector('.callout-title');
    
    if (title) {
      title.addEventListener('click', function() {
        callout.classList.toggle('callout-collapsed');
      });
    }
  });
});
