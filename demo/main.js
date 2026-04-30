 /* ── Sticky nav active state on scroll ── */
 (function() {
   var links = document.querySelectorAll('.nav-link');
   var sections = Array.from(links).map(function(link) {
     return document.querySelector(link.getAttribute('href'));
   });

   function onScroll() {
     var scrollY = window.scrollY + 80;
     var current = sections[0];
     sections.forEach(function(section) {
       if (section && section.offsetTop <= scrollY) {
         current = section;
       }
     });
     links.forEach(function(link) {
       link.classList.remove('active');
       if (link.getAttribute('href') === '#' + current.id) {
         link.classList.add('active');
       }
     });
   }
   window.addEventListener('scroll', onScroll, {
     passive: true
   });
   onScroll();
 })();
 /* ── Lightbox modal ── */
 var modalFrame = document.getElementById('modalFrame');
 var modalTitle = document.getElementById('modalTitle');
 var modalOverlay = document.getElementById('bannerModal');
 var modalBox = document.getElementById('modalBox');

 function openModal(event, src, title, width, height) {
   event.preventDefault();
   modalFrame.width = width;
   modalFrame.height = height;
   modalFrame.src = src;
   modalTitle.textContent = title;
   modalOverlay.classList.add('open');
   document.body.style.overflow = 'hidden';
 }

 function closeModalDirect() {
   modalOverlay.classList.remove('open');
   modalFrame.src = '';
   document.body.style.overflow = '';
 }

 function closeModal(event) {
   if (event.target === modalOverlay) {
     closeModalDirect();
   }
 }

 function replayModal() {
   var src = modalFrame.src;
   modalFrame.src = '';
   setTimeout(function() {
     modalFrame.src = src;
   }, 50);
 }
 /* Close on Escape key */
 document.addEventListener('keydown', function(e) {
   if (e.key === 'Escape') {
     closeModalDirect();
   }
 });
 /* ── Auto version from last modified date ── */
 (function() {
   var modified = new Date(document.lastModified);
   var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   //  var formatted = months[modified.getMonth()] + ' ' +
   //      modified.getDate() + ', ' +
   //      modified.getFullYear() + ' ' +
   //      modified.toLocaleTimeString([], {
   //          hour: '2-digit',
   //          minute: '2-digit'
   //      });
   var formatted = months[modified.getMonth()] + ' ' + modified.getDate() + ', ' + modified.getFullYear();
   var versionCells = document.querySelectorAll('[id^="version-"]');
   versionCells.forEach(function(cell) {
     cell.textContent = formatted;
   });
 })();
 /* ── Manifest file loader ── */
 var manifestData = {};
 fetch('manifest.json').then(function(res) {
   if (!res.ok) throw new Error('manifest.json not found');
   return res.json();
 }).then(function(data) {
   manifestData = data;
 }).catch(function(err) {
   console.warn('Could not load manifest.json:', err);
 });
 /* ── Files drawer toggle ── */
 function toggleFiles(btn) {
   var size = btn.getAttribute('data-size');
   var drawer = document.getElementById('drawer-' + size);
   var fileList = document.getElementById('files-' + size);
   var isOpen = drawer.style.display !== 'none';
   if (isOpen) {
     drawer.style.display = 'none';
     btn.textContent = 'Show Files';
     btn.classList.remove('open');
   } else {
     /* Populate list if empty */
     if (fileList.children.length === 0) {
       var files = manifestData[size];
       if (files && files.length > 0) {
         files.forEach(function(file) {
           var li = document.createElement('li');
           li.textContent = file;
           fileList.appendChild(li);
         });
       } else {
         var li = document.createElement('li');
         li.textContent = 'No files listed in manifest.json';
         fileList.appendChild(li);
       }
     }
     drawer.style.display = 'table-row';
     btn.textContent = 'Hide Files';
     btn.classList.add('open');
   }
 }
 /* ── Instructions toggle ── */
 function toggleInstructions(btn) {
   var body = document.getElementById('instructionsBody');
   var isVisible = body.style.display !== 'none';
   if (isVisible) {
     body.style.display = 'none';
     btn.textContent = 'Show';
   } else {
     body.style.display = 'block';
     btn.textContent = 'Hide';
   }
 }