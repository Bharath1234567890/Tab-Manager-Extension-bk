document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({}, function(tabs) {
    var tabList = document.getElementById('tabList');

    tabs.forEach(function(tab) {
      var tabItem = createTabItem(tab);
      tabList.appendChild(tabItem);
    });
  });

  function createTabItem(tab) {
    var tabItem = document.createElement('div');
    tabItem.classList.add('tab-item');

    var title = document.createElement('div');
    title.classList.add('tab-title');
    title.textContent = tab.title;

    var url = document.createElement('div');
    url.classList.add('tab-url');
    url.textContent = tab.url;

    var deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = 'Delete';

    tabItem.appendChild(title);
    tabItem.appendChild(url);
    tabItem.appendChild(deleteButton);

    tabItem.addEventListener('click', function() {
      chrome.tabs.update(tab.id, { active: true });
    });

    deleteButton.addEventListener('click', function(event) {
      event.stopPropagation();
      chrome.tabs.remove(tab.id, function() {
        tabItem.remove();
      });
    });

    return tabItem;
  }
});
