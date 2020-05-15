$(document).ready(() => {
        if ($('input[type="checkbox"]:checked').length > 0 == true) $('input[type="checkbox"]:checked').prop("checked", false);
      
        // aqui va el checkcito
              let check = {}
              $(document).on('change', 'input[type="checkbox"]', function () {
                      if (!this.checked) delete check[$(this).data('id')]
                      else check[$(this).data('id')] = $(this).data('name')
                      
                      let obj = Object.values(check)
                      if (obj < 0) $('div.amenities > h4')
                      $('div.amenities > h4').text(Object.values(check).join(', '))
              })
      })