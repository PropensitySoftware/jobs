
# installs required dependent packages then
# gets nodejs and npm package from puppet forge

group{ "meandev":
	ensure => present,
	gid => 665
}

user{ "meandev":	
	ensure => present,
	gid => "meandev",
	groups => ["adm"],
	membership => minimum,
	shell => "/bin/bash",
	require => Group["meandev"]
}

# first create a standard location for deploying our MEAN applications to
file { "/usr/local/src/mean":
	ensure => "directory",
	mode => '0664',
	owner => "meandev",
	group => "meandev",
	require => User["meandev"]
}

package {"nodejs":}

# install bower
package { 'bower':
  provider => 'npm',
  require  => Package['nodejs']
}

# install grunt
package { 'grunt-cli':
  provider => 'npm',
  require  => Package['nodejs']
}



