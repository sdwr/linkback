<template>
  <div>
    <button @click="goBack">Back</button>
    <div class="table-container" id="debug-table-container">

    </div>
  </div>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      apiData: {
        links: [],
        tags: [],
        savedLinks: [],
        taggedLinks: [],
        comments: [],
        votes: [],
        users: [],
        userActions: [],
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    createTable(name, data) {
      // Create a container for the table and title
      const container = document.createElement('div');
      container.style.textAlign = 'center';

      // Create title
      const title = document.createElement('h2');
      title.textContent = name;
      container.appendChild(title);  // Append title to the container

      // Create a table element
      const table = document.createElement('table');
      table.style.width = '100%';
      table.setAttribute('border', '1');
      container.appendChild(table);  // Append table to the container

      // Create header row
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      Object.keys(data[0]).forEach(key => {
          const th = document.createElement('th');
          th.textContent = key;
          headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create body rows
      const tbody = document.createElement('tbody');
      data.forEach(obj => {
          const tr = document.createElement('tr');
          Object.keys(obj).forEach(key => {
              const td = document.createElement('td');
              td.textContent = obj[key];
              tr.appendChild(td);
          });
          tbody.appendChild(tr);
      });
      table.appendChild(tbody);

      // Append the container to the main container
      document.getElementById('debug-table-container').appendChild(container);
    },
  },
  async created() {
    // Fetch the data from the API
    this.apiData.links = await api.getLinks();
    this.apiData.tags = await api.getTags();
    this.apiData.savedLinks = await api.getSavedLinks();
    this.apiData.taggedLinks = await api.getTaggedLinks();
    this.apiData.users = await api.getUsers();
    this.apiData.userActions = await api.getUserActions();
    this.apiData.comments = await api.getComments();
    this.apiData.votes = await api.getVotes();

    // Create a table for each data type
    Object.keys(this.apiData).forEach(key => {
      if(this.apiData[key].length === 0) return;
      this.createTable(key, this.apiData[key]);
    });
  }
};
</script>
