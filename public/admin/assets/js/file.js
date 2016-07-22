$(function () {
  
  //sidebar show/hide
  function openSideBar() {
    $('.rightSideBarTrigger').addClass('open');
    $('.rightSideBar').addClass('open');
   }
   
   function closeSideBar() {
     $('.rightSideBarTrigger').removeClass('open');
     $('.rightSideBar').removeClass('open');
   }
   
   function toggleSideBar(){
     $('.rightSideBarTrigger').toggleClass('open')
     $('.rightSideBar').toggleClass('open');
   }
  
  //global image uploader
  function handleImageDrop(e){
    e.preventDefault()
    var files = e.originalEvent.dataTransfer.files
    var formData = new FormData()

    //upload files
    $(files).each( function(index, file){
      formData.append('file', file)
    })

    $.ajax({
      url: '/admin/images/upload',
      data: formData,
      processData: false,
      contentType: false,
      type: 'POST',
      success: addToSideBar,
      error: function (err) {
        console.log('error', err)
      }
    })

  }

  function addToSideBar(files){
    //add uploaded files to the sidebar
    files.forEach(function (file) {
      $filename = file.originalname;
      $destination = file.destination;
      $file = file.filename;
      $url = "/uploads/" + $file;
      openSideBar();

      if ($filename.includes(".jpg", ".gif")) {
        $('.rightSideContent').prepend(`<a href="#" class="list-group"><img width="100%" class="trigger img-thumbnail" src="${$url}" value="${$url}" /><p>${$filename}</p></a>`);
      } else {
        $('.rightSideContent').prepend(`<a href="#" class="list-group"><h3 class="trigger" value="${$url}">"${$filename}"</h3></a>`);
      }
    })
  }

    $('body')
            .on('dragover', function(){ return false } )
            .on('dragenter', function(){ return false } )
            .on('drop', handleImageDrop )

    //listener for when user is done uploading files
    $('#done_btn')
            .on('click', closeSideBar )
    //copies file url to clipboard
    $('.rightSideContent').on('click', ".trigger", function(e){
      e.preventDefault();
      var url = $(this).attr("value");
      copy(url);
    })

     $('.rightSideBarTrigger').click( toggleSideBar )
  })
  

  function copy(string) {
    var dummy = document.createElement("input");
    // Add it to the document
    document.body.appendChild(dummy);
    // Set its ID
    dummy.setAttribute("id", "dummy_id");
    // Output the array into it
    document.getElementById("dummy_id").value = string;
    // Select it
    dummy.select();
    // Copy its contents
    document.execCommand("copy");
    // Remove it as its not needed anymore
    document.body.removeChild(dummy);
  }
