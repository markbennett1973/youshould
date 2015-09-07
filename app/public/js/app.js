$(document).ready(function() {
	var $list = $('#books');

	$.get('/api/books', function(data) {
		$(data).each(function(key, item) {
			$list.append(buildListItem(item._id, item.name));
		});
	});

	$list.on('click', 'a', function(e) {
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

	$("#add-book").click(function() {
		var title = $("#new-book-title").val();
		if (title) {
			var data = {'name' : title};
			$.post('/api/books', data, function(data) {
				$list.append(buildListItem(data.id, title));
				$("#new-book-title").val('');
			});
		}
		else {
			alert('Please enter a title');
		}
	});

	function buildListItem(id, title) {
			var deleteLink = '<a href="/api/books/' + id + '">Delete</a>';
			var li = '<li>' + title + ' (' + deleteLink + ')</li>';
			return li;
	}
});
