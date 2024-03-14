<template>
  <div>
    <button @click="goBack">Back</button>
    <h1>Debug Page</h1>
    <button @click="deleteAll">Delete all</button>
    <div class="table-container" id="debug-table-container">

    </div>
  </div>
</template>

<script>
import api from '@/api.js';

export default {
  data() {
    return {
      apiData: {
        links: [],
        tags: [],
        savedlinks: [],
        taglinks: [],
        comments: [],
        votes: [],
        users: [],
        useractions: [],
      }
    };
  },
  methods: {
    async deleteAll() {
      await api.deleteAll();
      await this.loadData();
      this.buildTables();
    },
    async deleteTable(tableName) {
      await api.deleteTable(tableName);
      await this.loadData();
      this.buildTables();
    },
    async loadData() {
      // Fetch the data from the API
      this.apiData.links = await api.getLinks();
      this.apiData.tags = await api.getTags();
      this.apiData.savedlink = await api.getSavedLinks();
      this.apiData.taglinks = await api.getTaggedLinks();
      this.apiData.users = await api.getUsers();
      this.apiData.useractions = await api.getUserActions();
      this.apiData.comments = await api.getComments();
      this.apiData.votes = await api.getVotes();
    },
    goBack() {
      this.$router.go(-1);
    },
    buildTables() {
      // Clear the table container
      document.getElementById('debug-table-container').innerHTML = '';

      // Create a table for each data type
      Object.keys(this.apiData).forEach(key => {
        if(!this.apiData[key]) return;
        this.createTable(key, this.apiData[key]);
      });
    },
    createTable(name, data) {
      // Create a container for the table and title
      const container = document.createElement('div');
      container.style.textAlign = 'center';

      // Create title
      const title = document.createElement('h2');
      title.textContent = name;
      container.appendChild(title);  // Append title to the container

      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = `Delete ${name}`;
      deleteButton.onclick = () => this.deleteTable(name);
      deleteButton.style.marginLeft = '10px';
      title.appendChild(deleteButton);  // Append delete button to the container

      // Create a table element
      const table = document.createElement('table');
      table.style.width = '100%';
      table.setAttribute('border', '1');
      container.appendChild(table);  // Append table to the container

      // Create header row
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      if (data.length > 0) {
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
    }
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create body rows
      const tbody = document.createElement('tbody');
      data.forEach(obj => {
          const tr = document.createElement('tr');
          Object.keys(obj).forEach(key => {
            const td = document.createElement('td');
              tr.appendChild(td);
              //create a div inside the cell to force height and overflow
              const div = document.createElement('div');
              div.textContent = obj[key];
              div.style.maxHeight = '70px';
              div.style.overflow = 'auto';
              td.appendChild(div);
          });
          tbody.appendChild(tr);
      });
      table.appendChild(tbody);

      // Append the container to the main container
      document.getElementById('debug-table-container').appendChild(container);
    },
  },
  async created() {
    this.$store.commit('savePageTitle', 'Debug Page')

    await this.loadData();
    this.buildTables();
    
  }
};
</script>
