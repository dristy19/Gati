// ===== Load SERVICE SELECTION and initialize tab-switch logic
loadSection('service_selection', '../Home/service_selection.html', () => {
  initQuoteTabs();
});

// ===== Tab-switch logic for quote forms
function initQuoteTabs() {
  const tabs = document.querySelectorAll('.quote-widget .tab');
  const forms = document.querySelectorAll('.quote-widget .form-content');

  if (!tabs.length || !forms.length) return;

  // Handle tab click
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Hide all forms
      forms.forEach(form => form.style.display = 'none');

      // Activate clicked tab
      tab.classList.add('active');

      // Show matching form
      const targetId = tab.dataset.target;
      const formToShow = document.getElementById(`form-${targetId}`);
      if (formToShow) {
        formToShow.style.display = 'block';
      }
    });
  });

  // On initial load: Show the default form
  const activeTab = document.querySelector('.quote-widget .tab.active');
  if (activeTab) {
    const defaultFormId = activeTab.dataset.target;
    const defaultForm = document.getElementById(`form-${defaultFormId}`);
    if (defaultForm) {
      defaultForm.style.display = 'block';
    }
  }
}
