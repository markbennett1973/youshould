$(document).ready(function() {
	var $list = $('#books');

	$.get('/api/books', function(data) {
		$(data).each(function(key, item) {
			$list.append(buildListItem(item._id, item.name));
		});
	});

	$list.on('click', 'a.delete', function(e) {
		e.preventDefault();
		var $item = $(e.target);

		if (confirm('Are you sure you want to delete this book?')) {
			var url = $item.attr('href');
			$.ajax({
				url: url, 
				type: 'DELETE',
				'success': function(data) {
					$item.parent().remove();
				}
			});
		}
	});

	$list.on('click', 'a.info', function(e) {
		e.preventDefault();
		var $item = $(e.target);
		$.get($item.attr('href'), function(data) {
			var html = '<h2>' + data.name + '</h2>';
			html += '<p>' + data.description + '</p>';
			$("#book-info").html(html);
		});
	});

	$("#add-book").click(function() {
		var title = $("#new-book-title").val();
		var description = $("#new-book-description").val();

		if (title) {
			var data = {'name' : title, 'description' : description};
			$.post('/api/books', data, function(data) {
				$list.append(buildListItem(data.id, title));
				$("#new-book-title").val('');
				$("#new-book-description").val('');				
			});
		}
		else {
			alert('Please enter a title');
		}
	});

	function buildListItem(id, title) {
		var deleteLink = '<a class="delete" href="/api/books/' + id + '">Delete</a>';
		var infoLink = '<a class="info" href="/api/books/' + id + '">Info</a>';
		var li = '<li>' + title + ' (' + infoLink + ') (' + deleteLink + ')</li>';
		return li;
	}
});
