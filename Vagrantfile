# -*- mode: ruby -*-
# vi: set ft=ruby :


VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

	config.vm.define :mongodb do |mongodb|
		mongodb.vm.box = "hashicorp/precise64"
		mongodb.vm.network "private_network", ip: "10.0.0.100"
		mongodb.vm.network "forwarded_port", guest: 27017, host: 37017

		# This shell provisioner installs librarian-puppet and runs it to install
		# puppet modules. This has to be done before the puppet provisioning so that
		# the modules are available when puppet tries to parse its manifests.
		# must pass in directory of the Puppetfile location
		mongodb.vm.provision :shell, :path => "vagrantcfg/shell/prereqs.sh", :args => "vagrantcfg/puppet/librarian/mongodb"

		# Now run the puppet provisioner. Note that the modules directory is entirely
		# managed by librarian-puppet
		mongodb.vm.provision :puppet do |mongodb_puppet|
			mongodb_puppet.manifests_path = "vagrantcfg/puppet/manifests"
			mongodb_puppet.manifest_file  = "mongo.pp"
		end
	end

	config.vm.define :appserver do |appserver|
	

		appserver.vm.provider "virtualbox" do |v|
			v.memory = 1024
		end	
	
		appserver.vm.box = "hashicorp/precise64"
		appserver.vm.network "private_network", ip: "10.0.0.101"
		appserver.vm.network "forwarded_port", guest: 3000, host: 4000		

		# This shell provisioner installs librarian-puppet and runs it to install
		# puppet modules. This has to be done before the puppet provisioning so that
		# the modules are available when puppet tries to parse its manifests.
		# must pass in directory of the Puppetfile location
		appserver.vm.provision :shell, :path => "vagrantcfg/shell/prereqs.sh", :args => "vagrantcfg/puppet/librarian/appserver"

		# Now run the puppet provisioner. Note that the modules directory is entirely
		# managed by librarian-puppet
		appserver.vm.provision :puppet do |appserver_puppet|
			appserver_puppet.manifests_path = "vagrantcfg/puppet/manifests"
			appserver_puppet.manifest_file  = "appserver.pp"
		end

		appserver.vm.provision :shell, :path => "vagrantcfg/shell/kickstart-app.sh"		
		
	end
end
