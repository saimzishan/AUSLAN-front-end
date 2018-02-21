$(function(){
	// Expandable textarea component handler
	$('.expandable-textarea').on('keyup paste',function(){
		var $el = $(this),
			offset = $el.innerHeight() - $el.height();

		if ( $el.innerHeight < this.scrollHeight )
		{
			$el.height( this.scrollHeight - offset );
		}
		else
		{
			$el.height( 1 );
			$el.height( this.scrollHeight - offset );
		}
	});
});