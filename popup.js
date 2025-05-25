// Restaurar configurações salvas
browser.storage.sync.get(["newColor", "lightMode"]).then((data) => {
  if (data.newColor) {
    document.getElementById("colorPicker").value = data.newColor;
  }
  document.getElementById("lightModeToggle").checked = !!data.lightMode;
});

// Salvar cor + modo claro
document.getElementById('saveBtn').addEventListener('click', async () => {
  const selectedColor = document.getElementById('colorPicker').value;
  const lightMode = document.getElementById('lightModeToggle').checked;

  await browser.storage.sync.set({ newColor: selectedColor, lightMode: lightMode });

  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (tabs.length > 0) {
    browser.tabs.reload(tabs[0].id);
  }
});

